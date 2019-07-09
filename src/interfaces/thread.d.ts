/**
 * Thread metadata type
 */
export interface IThreadMeta {
  /**
   * Thread title
   */
  title: string,
  /**
   * Thread ID
   */
  tid: number,
  /**
   * Thread URL
   */
  url: string,
  /**
   * Thread image, only for Swiper
   */
  image?: string,
  /**
   * Thread section
   */
  section: string,
  /**
   * Thread post time
   */
  timestamp: number,
  /**
   * Thread author info
   */

  author: {
    /**
     * Author's username
     */
    username: string,
    /**
     * Author's UID
     */
    uid?: number,
    /**
     * Author's avatar
     */
    avatar?: string,
  },
  /**
   * Thread stats info
   */
  stats: {
    /**
     * Viewed ammount
     */
    viewed: number
    /**
     * Replied ammount
     */
    replied: number
  }
}

/**
 * Thread content type
 */
export interface IThread {
  title: string,
  tid: number,
  timestamp: number,
  viewed: number,
  replied: number,
  content: string,
  maxPosition: number,
  author: {
    username: string,
    uid: number,
    avatar: string
  },
  replies: IReply[]
}

export interface IReply {
  user: {
    username: string,
    uid: number,
    avatar: string
  },
  content: string,
  timestamp: number,
  position: number
}
