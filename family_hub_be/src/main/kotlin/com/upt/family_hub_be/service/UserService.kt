package com.upt.family_hub_be.service

import com.upt.family_hub_be.dto.EventDTO
import com.upt.family_hub_be.dto.UserProfileDTO
import com.upt.family_hub_be.entity.Event
import com.upt.family_hub_be.entity.UserProfile
import com.upt.family_hub_be.mappers.UserMapper
import com.upt.family_hub_be.repository.EventRepository
import com.upt.family_hub_be.repository.UserRepository
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import java.util.function.Function
import java.util.stream.Collectors


@Service
class UserService(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper,
    eventRepository: EventRepository
) {

    fun getAll(): List<UserProfileDTO> = userRepository.findAll().map { userMapper.toDto(it) }
    fun findById(userId: Long): UserProfile =
        userRepository.findById(userId)
            .orElseThrow {
                NoSuchElementException("User with id $userId was not found")
            }
    fun findDTOById(userId: Long): UserProfileDTO =
        userRepository.findById(userId)
            .map { userMapper.toDto(it) }
            .orElseThrow {
                NoSuchElementException("User with id $userId was not found")
            }

    fun createUser(userProfileDto: UserProfileDTO): UserProfile {
        userRepository.findUserByUsername(userProfileDto.username)?.let {
            throw IllegalArgumentException("User with username ${userProfileDto.username} already exists")
        }
        return userRepository.save(userMapper.fromDto(userProfileDto))
    }

    fun findByUsername(username: String): UserProfile? = userRepository.findUserByUsername(username)

    fun getMyEvents(authentication: Authentication): List<EventDTO> {
        val user = userRepository.findUserByUsername(authentication.name)
            ?: throw NoSuchElementException("User with username ${authentication.name} was not found")
        return user.events?.map { EventDTO(it) } ?: emptyList()
    }
}