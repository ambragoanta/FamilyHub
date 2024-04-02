package com.upt.family_hub_be.controller

import com.upt.family_hub_be.dto.UserProfileDTO
import com.upt.family_hub_be.entity.UserProfile
import com.upt.family_hub_be.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users")
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