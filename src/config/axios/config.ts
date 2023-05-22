const config: {
  base_url: {
    base: string
    dev: string
    pro: string
    test: string
  }
  result_code: number | string
  default_headers: AxiosHeaders
  request_timeout: number
} = {
  /**
   * api request base path
   */
  base_url: {
    // development environment interface prefix
    base: '',

    // package development environment interface prefix
    dev: '',

    // Package production environment interface prefix
    pro: '',

    // package test environment interface prefix
    test: ''
  },

  /**
   * The interface returns a status code successfully
   */
  result_code: '0000',

  /**
   * Interface request timeout
   */
  request_timeout: 60000,

  /**
   * Default interface request type
   * Optional value: application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export { config }
