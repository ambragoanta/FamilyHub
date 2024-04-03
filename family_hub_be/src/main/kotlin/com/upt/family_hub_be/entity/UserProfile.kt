package com.upt.family_hub_be.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.*

@Entity
data class UserProfile(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val userId: Long = 0,
    var username: String = "",
    var password: String = "",
    var role: String? = "",

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "users")
    @JsonBackReference
    var events: MutableSet<Event>? = mutableSetOf()

) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as UserProfile

        if (userId != other.userId) return false
        if (username != other.username) return false
        if (password != other.password) return false

        return true
    }

    override fun hashCode(): Int {
        var result = userId.hashCode()
        result = 31 * result + username.hashCode()
        result = 31 * result + password.hashCode()
        return result
    }

    override fun toString(): String {
        return "User(userId=$userId, username='$username', password='$password')"
    }
}
