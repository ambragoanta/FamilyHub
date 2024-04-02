package com.upt.family_hub_be.dto


data class UserProfileDTO (
    val userId: Long,
    var username: String,
    var password: String
) {
}