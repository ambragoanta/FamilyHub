package com.upt.family_hub_be.entity

import com.upt.family_hub_be.dto.EventDTO
import jakarta.persistence.*
import java.sql.Date
import java.sql.Time

@Entity
data class Event(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val eventId: Long? = 0,
    var title: String? = "",
    var dueDate: Date? = null,
    var dueTime: Time? = null

    //var participants: List<Long>
) {
    fun update(eventDto: EventDTO) {
        eventDto.title?.let { title = it }
        eventDto.dueDate?.let { dueDate = Date.valueOf(it) }
        eventDto.dueTime?.let { dueTime = Time.valueOf(it) }
    }
}
