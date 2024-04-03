package com.upt.family_hub_be.repository

import com.upt.family_hub_be.entity.UserProfile
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<UserProfile, Long>{
    fun findUserByUsername(username: String): UserProfile?
}