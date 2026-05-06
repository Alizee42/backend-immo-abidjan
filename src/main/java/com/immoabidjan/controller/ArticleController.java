package com.immoabidjan.controller;

import com.immoabidjan.model.Article;
import com.immoabidjan.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleRepository articleRepository;

    @GetMapping
    public List<Article> getPublished() {
        return articleRepository.findByPublieTrueOrderByPublishedAtDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getById(@PathVariable Long id) {
        return articleRepository.findById(id)
                .filter(Article::isPublie)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Article create(@RequestBody Article article) {
        return articleRepository.save(article);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> update(@PathVariable Long id, @RequestBody Article updated) {
        return articleRepository.findById(id).map(existing -> {
            updated.setId(id);
            return ResponseEntity.ok(articleRepository.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }
}
