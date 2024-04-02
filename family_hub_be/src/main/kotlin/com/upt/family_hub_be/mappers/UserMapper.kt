package com.upt.family_hub_be.mappers

import com.upt.family_hub_be.dto.UserProfileDTO
import com.upt.family_hub_be.entity.UserProfile
import lombok.AllArgsConstructor
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
@AllArgsConstructor
class UserMapper(private val passwordEncoder: PasswordEncoder) {
    fun fromDto(userProfileDto: UserProfileDTO): UserProfile =
        UserProfile (
            userId = userProfileDto.userId,
            username = userProfileDto.username,
            password = passwordEncoder.encode(userProfileDto.password)
        )


    fun toDto(userProfile: UserProfile): UserProfileDTO =
        UserProfileDTO(
            userId = userProfile.userId,
            username = userProfile.username,
            password = userProfile.password
        )
}