package com.immoabidjan.controller;

import com.immoabidjan.model.ContactRequest;
import com.immoabidjan.repository.ContactRequestRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactRequestRepository contactRequestRepository;

    @PostMapping
    public ResponseEntity<String> submit(@Valid @RequestBody ContactRequest contactRequest) {
        contactRequestRepository.save(contactRequest);
        return ResponseEntity.ok("Votre demande a été envoyée avec succès.");
    }
}
