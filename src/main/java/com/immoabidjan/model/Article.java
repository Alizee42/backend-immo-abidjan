package com.immoabidjan.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "articles")
@Data
@NoArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String contenu;

    @Column(columnDefinition = "TEXT")
    private String resume;

    private String imageUrl;
    private String auteur;

    @ElementCollection
    @CollectionTable(name = "article_tags", joinColumns = @JoinColumn(name = "article_id"))
    @Column(name = "tag")
    private List<String> tags;

    private boolean publie = false;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime publishedAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
