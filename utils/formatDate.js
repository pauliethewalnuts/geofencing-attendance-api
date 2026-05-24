const formatDate = (now)=>{

    const date = String(now.getDate()).padStart(2,'0')
    const month = String(now.getMonth() + 1).padStart(2,'0')
    const year = String(now.getFullYear())
    let hours = String(now.getHours()).padStart(2,'0')
    const minutes = String(now.getMinutes()).padStart(2,'0')

    const ampm = hours >=12 ? 'PM' : 'AM'
    hours = hours % 12

    if (hours === 0) {
        hours = 12
    }

    const currentDate = `${date}-${month}-${year}, ${hours}:${minutes} ${ampm}`

    return currentDate
}



module.exports = formatDate