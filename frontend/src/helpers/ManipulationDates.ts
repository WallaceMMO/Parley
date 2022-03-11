import React from 'react'

export function distanceBetweenDates(d1: Date, d2: Date) {
    let difference = d1.getTime() - d2.getTime()

    const days = Math.floor(difference / (1000 * 3600 * 24))

    // anos
    if(days > 365) {
        const year = Math.floor(days / 365)
        
        return year + (year == 1 ? " ano" : " anos")
    }

    // meses
    if(days > 30) {
        const month = Math.floor(days / 30)
        
        return month + (month == 1 ? " mês" : " meses")
    }

    // semanas
    if(days > 12) {
        const week = Math.floor(days / 7)
        
        return week + (week == 1 ? " semana" : " semanas")
    }

    // dias
    if(days != 0) {
        return Math.floor(days) + " dia"
    }

    // horas
    difference = Math.floor((d1.getTime() - d2.getTime()) / 36e5) // horas

    if(difference >= 1) {        
        return difference + (difference == 1 ? " hora" : " horas")
    }

    // minutos
    difference = Math.floor((d1.getTime() - d2.getTime()) / 60000)

    if(difference >= 1) {        
        return difference + (difference == 1 ? " minuto" : " minutos")
    }

    //segundos
    difference = Math.floor((d1.getTime() - d2.getTime()) / 1000)
    
    return difference + (difference == 1 ? " segundo" : " segundos")    
}