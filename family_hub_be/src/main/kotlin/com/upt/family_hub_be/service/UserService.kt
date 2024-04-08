package com.upt.family_hub_be.service

import com.upt.family_hub_be.dto.UserProfileDTO
import com.upt.family_hub_be.entity.UserProfile
import com.upt.family_hub_be.mappers.UserMapper
import com.upt.family_hub_be.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper
) {

    fun getAll(): List<UserProfileDTO> = userRepository.findAll().map { userMapper.toDto(it) }
    fun findById(userId: Long): UserProfile =
        userRepository.findById(userId)
            .orElseThrow {
                NoSuchElementException("User with id $userId was not found")
            }

    fun createUser(userProfileDto: UserProfileDTO): UserProfile {
        userRepository.findUserByUsername(userProfileDto.username)?.let {
            throw IllegalArgumentException("User with username ${userProfileDto.username} already exists")
        }
        return userRepository.save(userMapper.fromDto(userProfileDto))
    }

    fun updateUser(userProfileDto: UserProfileDTO): UserProfile {
        val user = userRepository.findById(userProfileDto.userId).orElseThrow {
            NoSuchElementException("User not found")
        }

        user.update(userProfileDto)
        return userRepository.save(user)
    }

    fun findByUsername(username: String): UserProfile? = userRepository.findUserByUsername(username)

}