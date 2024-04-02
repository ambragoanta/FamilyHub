package com.upt.family_hub_be.dto

import com.upt.family_hub_be.entity.Event

data class EventDTO(
    val eventId: Long,
    var title: String?,
    var dueDate: String?,
    var dueTime: String?
    //var participants: List<Long>
){
    constructor(event: Event): this(
        eventId = event.eventId,
        title = event.title,
        dueDate = event.dueDate.toString(),
        dueTime = event.dueTime.toString()
    )
}
