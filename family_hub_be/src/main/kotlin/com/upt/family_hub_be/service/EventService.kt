package com.upt.family_hub_be.service

import com.upt.family_hub_be.dto.EventDTO
import com.upt.family_hub_be.entity.Event
import com.upt.family_hub_be.repository.EventRepository
import com.upt.family_hub_be.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class EventService(
    private val eventRepository: EventRepository,
    private val userService: UserService,
    private val userRepository: UserRepository
) {
//    fun getAll(): List<EventDTO> = eventRepository.findAll().map { EventDTO(it) }

    fun getAll(): List<EventDTO> {
        // Retrieve all events from the repository
        val allEvents = eventRepository.findAll()

        // Sort the events by due date
        val sortedEvents = allEvents.sortedBy { it.dueDate }

        // Map each sorted event to EventDTO
        return sortedEvents.map { EventDTO(it) }
    }

    fun getOne(id: Long): EventDTO =
        eventRepository.findById(id)
            .map { EventDTO(it) }
            .orElseThrow {
                NoSuchElementException("Event with id $id was not found")
            }

    fun delete(id: Long) {
        eventRepository.findById(id).orElseThrow {
            NoSuchElementException("Event with id $id was not found")
        }
        eventRepository.deleteById(id)
    }

    fun update(id: Long, eventDto: EventDTO): EventDTO {
        val existingEvent = eventRepository.findById(id).orElseThrow {
            NoSuchElementException("Event not found with id: ${eventDto.eventId}")
        }
        existingEvent.update(eventDto)
        return EventDTO(eventRepository.save(existingEvent))
    }

    fun create(eventDto: EventDTO): EventDTO {
        try {
            val userProfiles = eventDto.users?.map { userId ->
                userService.findById(userId)
            }
            val event = Event(
                title = eventDto.title,
                dueDate = eventDto.dueDate,
                dueTime = eventDto.dueTime,
                users = userProfiles?.toMutableSet()
            ).let{
                eventRepository.save(it)
            }
            userProfiles?.forEach {
                it.events?.add(event)
                userRepository.save(it)
            }
            return EventDTO(event)
        } catch (e: Exception) {
            throw RuntimeException("User Group could not be created", e)
        }
    }
}