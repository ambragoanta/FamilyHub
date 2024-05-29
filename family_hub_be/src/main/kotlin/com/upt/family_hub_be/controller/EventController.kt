package com.upt.family_hub_be.controller

import com.upt.family_hub_be.dto.EventDTO
import com.upt.family_hub_be.service.EventService
import com.upt.family_hub_be.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = ["http://localhost:4200"])
class EventController (private val eventService: EventService, private val userService: UserService){

    @GetMapping
    fun getAll(): List<EventDTO> = eventService.getAll()

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): EventDTO = eventService.getOne(id)

    @PostMapping
    fun create(@RequestBody eventDto: EventDTO): ResponseEntity<EventDTO> =
        ResponseEntity(eventService.create(eventDto), HttpStatus.CREATED)

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody eventDto: EventDTO): EventDTO =
        eventService.update(id, eventDto)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Unit> =
        ResponseEntity(eventService.delete(id), HttpStatus.NO_CONTENT)

    @GetMapping("/family-events")
    fun getFamilyEvents(authentication: Authentication): ResponseEntity<List<EventDTO>> =
        ResponseEntity(eventService.getFamilyEvents(authentication), HttpStatus.OK)

}
