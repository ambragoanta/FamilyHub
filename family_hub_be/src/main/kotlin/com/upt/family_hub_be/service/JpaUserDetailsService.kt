package com.upt.family_hub_be.service

import com.upt.family_hub_be.repository.UserRepository
import com.upt.family_hub_be.security.SecurityUser
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class JpaUserDetailsService(
    private val userRepository: UserRepository
): UserDetailsService{
     override fun loadUserByUsername(username: String): UserDetails {
        return userRepository.findUserByUsername(username)
            ?.let { SecurityUser(it) }
            ?: throw IllegalArgumentException("User with username $username not found")
     }
}