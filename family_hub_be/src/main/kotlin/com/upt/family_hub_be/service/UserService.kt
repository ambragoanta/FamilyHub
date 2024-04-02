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
    fun createUser(userProfileDto: UserProfileDTO): UserProfile {
        userRepository.findUserByUsername(userProfileDto.username)?.let {
            throw IllegalArgumentException("User with username ${userProfileDto.username} already exists")
        }
        return userRepository.save(userMapper.fromDto(userProfileDto))
    }
}