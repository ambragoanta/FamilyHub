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
                name = userProfileDto.name,
                password = passwordEncoder.encode(userProfileDto.password),
                role = userProfileDto.role,
                profilePicture = userProfileDto.profilePicture
        )


    fun toDto(userProfile: UserProfile): UserProfileDTO =
        UserProfileDTO(
                userId = userProfile.userId,
                username = userProfile.username,
                name = userProfile.name,
                password = userProfile.password,
                role = userProfile.role,
                events = userProfile.events?.map { it.eventId }?.toMutableSet(),
                profilePicture = userProfile.profilePicture
        )
}