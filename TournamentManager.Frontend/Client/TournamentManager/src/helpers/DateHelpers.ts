export function formatDate(dateStr: string): string {
    const date = new Date(dateStr)

    if (isNaN(date.getTime())) {
        return 'Invalid date'
    }

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
}

export const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
        return 'Invalid date'
    }

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function isFutureDate(dateStr: string): boolean {
    const date = new Date(dateStr)
    const now = new Date()

    if (isNaN(date.getTime())) {
        throw new Error('Invlalid date')
    }

    return date > now
}

export function isPastDate(dateStr: string): boolean {
    const date = new Date(dateStr)
    const now = new Date()

    if (isNaN(date.getTime())) {
        throw new Error('Invlalid date')
    }

    return date < now
}
