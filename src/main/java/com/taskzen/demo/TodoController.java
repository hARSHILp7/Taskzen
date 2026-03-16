package com.taskzen.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // Get all tasks according to the Sorting
    @GetMapping
    public List<Todo> getAllTodos(@RequestParam(defaultValue = "newest") String sort) {
        if (sort.equals("oldest")) return todoRepository.findAllByOrderByCreatedAtAsc();
        if (sort.equals("pending")) return todoRepository.findAllByOrderByCompletedAscCreatedAtDesc();
        return todoRepository.findAllByOrderByCreatedAtDesc();
    }

    // POST create a new todo
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo saved = todoRepository.save(todo);
        return ResponseEntity.status(201).body(saved);
    }

    // DELETE a todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        if (!todoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // PATCH toggle status
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggleTodo(@PathVariable Long id) {
        return todoRepository.findById(id).map(todo -> {
            todo.setCompleted(!todo.isCompleted());
            return ResponseEntity.ok(todoRepository.save(todo));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Mark all tasks as complete
    @PatchMapping("/complete-all")
    public ResponseEntity<Void> completeAll() {
        List<Todo> todos = todoRepository.findAll();
        todos.forEach(todo -> todo.setCompleted(true));
        todoRepository.saveAll(todos);
        return ResponseEntity.ok().build();
    }

    // Delete all tasks
    @DeleteMapping("/delete-all")
    public ResponseEntity<Void> deleteAll() {
        todoRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
