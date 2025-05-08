import axios, { AxiosResponse } from 'axios'

let isInterceptorSetup = false

export const setupErrorHandlingInterceptor = () => {
    if (!isInterceptorSetup) {
        axios.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error) => {
                if (error.response) {
                    const statusCode = error.response.status
                    const data = error.response.data

                    switch (statusCode) {
                        case 400:
                            if (data.errors) {
                                const modalStateErrors = []

                                const errors =
                                    typeof data.errors === 'object' &&
                                    !Array.isArray(data.errors)
                                        ? Object.entries(data.errors).map(
                                              ([property, value]) => ({
                                                  property,
                                                  errorMessage: value,
                                              })
                                          )
                                        : data.errors

                                for (const item of errors) {
                                    const property = item.property
                                    const errorMessage = item.errorMessage

                                    if (property && errorMessage) {
                                        modalStateErrors.push({
                                            property,
                                            errorMessage,
                                        })
                                    }
                                }
                                console.log(modalStateErrors)
                            }
                            break
                        case 401:
                            console.log('Unauthorized')
                            break
                        case 403:
                            console.log('Forbidden')
                            break
                        case 404:
                            console.log('Not found')
                            break
                        default:
                            console.log('Generic Error')
                    }
                }
                return Promise.reject(error)
            }
        )
        isInterceptorSetup = true
    }
}
