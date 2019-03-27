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
  /**
   * Thread meta info
   * @see IThreadMeta
   */
  meta: IThreadMeta,
  /**
   * Thread main content (the first floor)
   */
  content: string,
  /**
   * Thread reply content
   */
  replies: string[]
}
