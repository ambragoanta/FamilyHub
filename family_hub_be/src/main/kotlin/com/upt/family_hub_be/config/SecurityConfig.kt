package com.upt.family_hub_be.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig {

//    @Value("\${cors.origin.url}")
//    private lateinit var corsOriginUrl: String
//
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain =
        http
            .csrf { it.disable() }
//            .cors { cors ->
//                cors.configurationSource {
//                    val configuration = org.springframework.web.cors.CorsConfiguration()
//                    configuration.allowedOrigins = listOf(corsOriginUrl)
//                    configuration.allowedMethods = listOf("GET", "POST", "DELETE", "PUT", "PATCH")
//                    configuration.allowedHeaders = listOf("*")
//
//                    configuration
//                }
//            }
            .authorizeHttpRequests {
                it.requestMatchers(HttpMethod.OPTIONS).permitAll()
                    .requestMatchers(HttpMethod.POST,"users/auth").anonymous()
                    .anyRequest().authenticated()
            }
            .formLogin (Customizer.withDefaults())
            .logout (Customizer.withDefaults())
            .httpBasic (Customizer.withDefaults())
            .build()
}