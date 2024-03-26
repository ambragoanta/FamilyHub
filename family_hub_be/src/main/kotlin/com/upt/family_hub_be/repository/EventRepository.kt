package com.upt.family_hub_be.repository

import com.upt.family_hub_be.entity.Event
import org.springframework.data.jpa.repository.JpaRepository

interface EventRepository: JpaRepository<Event, Long> {
}