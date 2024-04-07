package com.upt.family_hub_be.entity

import com.fasterxml.jackson.annotation.JsonManagedReference
import com.upt.family_hub_be.dto.EventDTO
import jakarta.persistence.*
import java.sql.Date
import java.sql.Time

@Entity
data class Event(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val eventId: Long = 0,
    var title: String? = "",
    var description: String? = "",
    var dueDate: Date? = null,
    var dueTime: Time? = null,

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinTable(
        name = "event_users",
        joinColumns = [JoinColumn(name = "event_id")],
        inverseJoinColumns = [JoinColumn(name = "user_id")]
    )
    var users: MutableSet<UserProfile>? = mutableSetOf()
) {
    fun update(eventDto: EventDTO) {
        eventDto.title?.let { title = it }
        eventDto.description?.let { description = it }
        eventDto.dueDate?.let { dueDate = it }
        eventDto.dueTime?.let { dueTime = it }
        eventDto.users?.let { updatedUsers ->
            users?.clear()
            users?.addAll(updatedUsers.map { UserProfile(it) }.toMutableSet())
        }
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Event

        return eventId == other.eventId
    }

    override fun hashCode(): Int {
        return eventId.hashCode()
    }
}
