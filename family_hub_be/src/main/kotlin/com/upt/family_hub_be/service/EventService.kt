package com.upt.family_hub_be.service

import com.upt.family_hub_be.dto.EventDTO
import com.upt.family_hub_be.entity.Event
import com.upt.family_hub_be.repository.EventRepository
import org.springframework.stereotype.Service
import java.sql.Date
import java.sql.Time

@Service
class EventService(
    private val eventRepository: EventRepository,
) {
    fun getAll(): List<EventDTO> = eventRepository.findAll().map { EventDTO(it) }

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

        val event = Event(
            title = eventDto.title,
            dueDate = Date.valueOf(eventDto.dueDate),
            dueTime = Time.valueOf(eventDto.dueTime)
        )
        return EventDTO(eventRepository.save(event))
    }
}