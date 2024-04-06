package com.upt.family_hub_be.controller

import com.upt.family_hub_be.dto.UserProfileDTO
import com.upt.family_hub_be.entity.UserProfile
import com.upt.family_hub_be.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = ["http://localhost:4200"])
class UserController(
    private val userService: UserService
) {

    @GetMapping
    fun getAll(): List<UserProfileDTO> = userService.getAll()

    @PostMapping("/auth")
    fun create(@RequestBody userProfileDto: UserProfileDTO): ResponseEntity<UserProfile> =
        ResponseEntity(userService.createUser(userProfileDto), HttpStatus.CREATED)

    @GetMapping("/auth")
    fun showUser(authentication: Authentication): ResponseEntity<String> =
        ResponseEntity(authentication.name, HttpStatus.OK)
}