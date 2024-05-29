package com.upt.family_hub_be.dto


data class UserProfileDTO (
    val userId: Long,
    var username: String,
    var name: String,
    var password: String,
    var profilePicture: ByteArray?,
    var role: String?,
    var events: MutableSet<Long>? = mutableSetOf(),
    var familyName: String?
)
