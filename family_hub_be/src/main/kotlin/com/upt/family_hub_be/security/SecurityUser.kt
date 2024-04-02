package com.upt.family_hub_be.security

import com.upt.family_hub_be.entity.UserProfile
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class SecurityUser(private val userProfile: UserProfile): UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return listOf(
            SimpleGrantedAuthority("read"),
            SimpleGrantedAuthority("write"),
            SimpleGrantedAuthority("admin")
        ).toMutableList()
    }

    override fun getPassword(): String {
        return userProfile.password
    }

    override fun getUsername(): String {
        return userProfile.username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}