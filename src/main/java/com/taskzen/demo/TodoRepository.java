package com.taskzen.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByOrderByCreatedAtDesc();
    List<Todo> findAllByOrderByCreatedAtAsc();
    List<Todo> findAllByOrderByCompletedAscCreatedAtDesc();
}
