package com.immoabidjan.repository;

import com.immoabidjan.model.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRequestRepository extends JpaRepository<ContactRequest, Long> {

    List<ContactRequest> findByTraiteFalseOrderByCreatedAtDesc();
}
