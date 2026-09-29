package com.renteasy.renteasy.controller;

import com.renteasy.renteasy.models.Room;
import com.renteasy.renteasy.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping
    public ResponseEntity<Room> addRoom(
            @Valid @RequestBody Room room) {

        return ResponseEntity.ok(
                roomService.addRoom(room)
        );
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {

        return ResponseEntity.ok(
                roomService.getAllRooms()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                roomService.getRoomById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(
            @PathVariable Long id,
            @Valid @RequestBody Room room) {

        return ResponseEntity.ok(
                roomService.updateRoom(id, room)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(
            @PathVariable Long id) {

        roomService.deleteRoom(id);

        return ResponseEntity.ok(
                "Room deleted successfully"
        );
    }
}