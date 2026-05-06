package com.immoabidjan.repository;

import com.immoabidjan.model.Property;
import com.immoabidjan.model.PropertyStatus;
import com.immoabidjan.model.PropertyType;
import com.immoabidjan.model.Quartier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByType(PropertyType type);

    List<Property> findByQuartier(Quartier quartier);

    List<Property> findByStatus(PropertyStatus status);

    List<Property> findByTypeAndQuartier(PropertyType type, Quartier quartier);

    List<Property> findByTypeAndStatus(PropertyType type, PropertyStatus status);
}
