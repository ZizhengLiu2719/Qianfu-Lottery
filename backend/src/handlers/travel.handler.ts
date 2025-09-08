import { Context } from 'hono'
import { runWithPrisma } from '../services/db'

export function createTravelHandlers() {
  
  /**
   * 获取旅游文章列表
   */
  const getTravelPosts = async (c: Context) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      // 获取查询参数
      const page = Math.max(1, parseInt(c.req.query('page') || '1'))
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query('limit') || '20')))
      const category = c.req.query('category') // DOMESTIC, INTERNATIONAL
      const tag = c.req.query('tag')
      const offset = (page - 1) * limit

      const { posts, total } = await runWithPrisma(databaseUrl, async (prisma) => {
        // 构建查询条件
        const where = {
          isPublished: true,
          ...(category && { category }),
          ...(tag && { 
            tags: {
              has: tag
            }
          })
        }

        const [postsList, totalCount] = await Promise.all([
          prisma.travelPost.findMany({
            where,
            select: {
              id: true,
              title: true,
              summary: true,
              category: true,
              tags: true,
              imageUrl: true,
              author: true,
              viewCount: true,
              createdAt: true,
              updatedAt: true
            },
            orderBy: [
              { createdAt: 'desc' }
            ],
            skip: offset,
            take: limit
          }),
          prisma.travelPost.count({ where })
        ])

        return { posts: postsList, total: totalCount }
      })

      return c.json({
        code: 200,
        message: 'Travel posts retrieved successfully',
        data: {
          posts,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      })

    } catch (error) {
      console.error('Get travel posts error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取旅游文章详情
   */
  const getTravelPost = async (c: Context) => {
    try {
      const postId = parseInt(c.req.param('id'))
      
      if (isNaN(postId)) {
        return c.json({
          code: 400,
          message: 'Invalid post ID',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const post = await runWithPrisma(databaseUrl, async (prisma) => {
        // 获取文章详情并增加浏览量
        const [foundPost] = await Promise.all([
          prisma.travelPost.findUnique({
            where: { 
              id: postId,
              isPublished: true
            }
          }),
          // 异步增加浏览量
          prisma.travelPost.update({
            where: { id: postId },
            data: {
              viewCount: {
                increment: 1
              }
            }
          }).catch(() => {
            // 忽略更新失败，不影响主要功能
          })
        ])

        return foundPost
      })

      if (!post) {
        return c.json({
          code: 404,
          message: 'Travel post not found',
          data: null
        }, 404)
      }

      return c.json({
        code: 200,
        message: 'Travel post retrieved successfully',
        data: { post }
      })

    } catch (error) {
      console.error('Get travel post error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取热门标签
   */
  const getPopularTags = async (c: Context) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const popularTags = await runWithPrisma(databaseUrl, async (prisma) => {
        // 获取所有已发布文章的标签
        const posts = await prisma.travelPost.findMany({
          where: { isPublished: true },
          select: { tags: true }
        })

        // 统计标签出现频率
        const tagCounts: Record<string, number> = {}
        posts.forEach(post => {
          post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1
          })
        })

        // 转换为数组并排序
        return Object.entries(tagCounts)
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 20) // 取前20个热门标签
      })

      return c.json({
        code: 200,
        message: 'Popular tags retrieved successfully',
        data: { tags: popularTags }
      })

    } catch (error) {
      console.error('Get popular tags error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 搜索旅游文章
   */
  const searchTravelPosts = async (c: Context) => {
    try {
      const query = c.req.query('q')
      if (!query || query.trim().length === 0) {
        return c.json({
          code: 400,
          message: 'Search query is required',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const page = Math.max(1, parseInt(c.req.query('page') || '1'))
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query('limit') || '20')))
      const offset = (page - 1) * limit

      // 简单的文本搜索（可以后续优化为全文搜索）
      const searchCondition = {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive' as const
            }
          },
          {
            content: {
              contains: query,
              mode: 'insensitive' as const
            }
          },
          {
            summary: {
              contains: query,
              mode: 'insensitive' as const
            }
          }
        ],
        isPublished: true
      }

      const { posts, total } = await runWithPrisma(databaseUrl, async (prisma) => {
        const [postsList, totalCount] = await Promise.all([
          prisma.travelPost.findMany({
            where: searchCondition,
            select: {
              id: true,
              title: true,
              summary: true,
              category: true,
              tags: true,
              imageUrl: true,
              author: true,
              viewCount: true,
              createdAt: true
            },
            orderBy: [
              { viewCount: 'desc' },
              { createdAt: 'desc' }
            ],
            skip: offset,
            take: limit
          }),
          prisma.travelPost.count({ where: searchCondition })
        ])

        return { posts: postsList, total: totalCount }
      })

      return c.json({
        code: 200,
        message: 'Search completed successfully',
        data: {
          posts,
          query,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      })

    } catch (error) {
      console.error('Search travel posts error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  return {
    getTravelPosts,
    getTravelPost,
    getPopularTags,
    searchTravelPosts
  }
}
