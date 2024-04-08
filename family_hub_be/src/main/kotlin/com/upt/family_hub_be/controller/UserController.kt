package com.upt.family_hub_be.controller

import com.upt.family_hub_be.dto.EventDTO
import com.upt.family_hub_be.dto.LoginDTO
import com.upt.family_hub_be.dto.UserProfileDTO
import com.upt.family_hub_be.entity.UserProfile
import com.upt.family_hub_be.mappers.UserMapper
import com.upt.family_hub_be.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.IOException

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = ["http://localhost:4200"])
class UserController(
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder,
        private val userMapper: UserMapper,
) {

    @GetMapping
    fun getAll(): List<UserProfileDTO> = userService.getAll()

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): UserProfileDTO = userService.findDTOById(id)

    @PostMapping("/auth")
    fun create(@RequestBody userProfileDto: UserProfileDTO): ResponseEntity<UserProfile> =
        ResponseEntity(userService.createUser(userProfileDto), HttpStatus.CREATED)

    @GetMapping("/me")
    fun getUser(authentication: Authentication): ResponseEntity<UserProfileDTO> {
        val username = authentication.name
        val user = userService.findByUsername(username)
        return if (user != null) {
            ResponseEntity.ok(userMapper.toDto(user))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }

    @PutMapping("/update")
    fun updateUser(@RequestBody updateProfileDto: UserProfileDTO, authentication: Authentication): ResponseEntity<Any> {
        val currentUsername = authentication.name
        val userToUpdate = userService.findByUsername(currentUsername)

        return try {
            val updatedUser = userService.updateUser(updateProfileDto)
            ResponseEntity.ok(userMapper.toDto(updatedUser))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        }
    }

    @PostMapping("/uploadProfilePicture")
    fun uploadProfilePicture(@RequestParam("file") file: MultipartFile, authentication: Authentication): ResponseEntity<String> {
        val user = userService.findByUsername(authentication.name)

        if (user != null) {
            try {
                val byteArr = file.bytes
                user.profilePicture = byteArr
                userService.updateUser(userMapper.toDto(user))
                return ResponseEntity.ok("Profile picture uploaded successfully")
            } catch (e: IOException) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image")
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found")
        }
    }

    @GetMapping("/profilePicture")
    fun getProfilePicture(authentication: Authentication): ResponseEntity<ByteArray> {
        val user = userService.findByUsername(authentication.name)
        return if (user?.profilePicture != null) {
            ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(user.profilePicture)
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }

    @GetMapping("/profilePicture/{userId}")
    fun getProfilePictureById(@PathVariable userId: Long): ResponseEntity<ByteArray> {
        val user = userService.findById(userId)
        return if (user?.profilePicture != null) {
            ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(user.profilePicture)
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }

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