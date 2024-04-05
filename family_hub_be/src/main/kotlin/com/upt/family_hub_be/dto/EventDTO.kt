package com.upt.family_hub_be.dto

import com.upt.family_hub_be.entity.Event
import java.sql.Date
import java.sql.Time

data class EventDTO(
    val eventId: Long,
    var title: String?,
    var dueDate: Date?,
    var dueTime: Time?,
    var users: MutableSet<Long>? = mutableSetOf()
){
    constructor(event: Event): this(
        eventId = event.eventId,
        title = event.title,
        dueDate =  event.dueDate,
        dueTime = event.dueTime,
        users = event.users?.map { it.userId }?.toMutableSet()
    )
}
