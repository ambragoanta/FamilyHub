package com.upt.family_hub_be.controller

import com.upt.family_hub_be.dto.EventDTO
import com.upt.family_hub_be.dto.LoginDTO
import com.upt.family_hub_be.dto.UserProfileDTO
import com.upt.family_hub_be.entity.UserProfile
import com.upt.family_hub_be.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = ["http://localhost:4200"])
class UserController(
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder
) {

    @GetMapping
    fun getAll(): List<UserProfileDTO> = userService.getAll()

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): UserProfileDTO = userService.findDTOById(id)

    @PostMapping("/auth")
    fun create(@RequestBody userProfileDto: UserProfileDTO): ResponseEntity<UserProfile> =
        ResponseEntity(userService.createUser(userProfileDto), HttpStatus.CREATED)

    @GetMapping("/auth")
    fun showUser(authentication: Authentication): ResponseEntity<String> =
        ResponseEntity(authentication.name, HttpStatus.OK)

    @PostMapping("/login")
    fun login(@RequestBody loginDto: LoginDTO): ResponseEntity<Boolean> {
        val user = userService.findByUsername(loginDto.username)
        return if (user != null && passwordEncoder.matches(loginDto.password, user.password)) {
            ResponseEntity.ok(true)
        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false)
        }
    }

    @GetMapping("/my-events")
    fun getMyEvents(authentication: Authentication): ResponseEntity<List<EventDTO>> =
        ResponseEntity(userService.getMyEvents(authentication), HttpStatus.OK)
}