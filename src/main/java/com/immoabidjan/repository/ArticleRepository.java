package com.immoabidjan.repository;

import com.immoabidjan.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByPublieTrue();

    List<Article> findByPublieTrueOrderByPublishedAtDesc();
}
