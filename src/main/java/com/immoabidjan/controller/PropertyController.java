package com.immoabidjan.controller;

import com.immoabidjan.model.Property;
import com.immoabidjan.model.PropertyStatus;
import com.immoabidjan.model.PropertyType;
import com.immoabidjan.model.Quartier;
import com.immoabidjan.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyRepository propertyRepository;

    @GetMapping
    public List<Property> getAll(
            @RequestParam(required = false) PropertyType type,
            @RequestParam(required = false) Quartier quartier,
            @RequestParam(required = false) PropertyStatus status) {

        if (type != null && quartier != null) {
            return propertyRepository.findByTypeAndQuartier(type, quartier);
        }
        if (type != null && status != null) {
            return propertyRepository.findByTypeAndStatus(type, status);
        }
        if (type != null) {
            return propertyRepository.findByType(type);
        }
        if (quartier != null) {
            return propertyRepository.findByQuartier(quartier);
        }
        if (status != null) {
            return propertyRepository.findByStatus(status);
        }
        return propertyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getById(@PathVariable Long id) {
        return propertyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Property create(@RequestBody Property property) {
        return propertyRepository.save(property);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> update(@PathVariable Long id, @RequestBody Property updated) {
        return propertyRepository.findById(id).map(existing -> {
            updated.setId(id);
            return ResponseEntity.ok(propertyRepository.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!propertyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        propertyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
