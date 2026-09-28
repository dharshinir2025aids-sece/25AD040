package com.renteasy.renteasy.service;

import com.renteasy.renteasy.models.Room;
import com.renteasy.renteasy.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }

    public Room updateRoom(Long id, Room updatedRoom) {

        Room existingRoom = roomRepository.findById(id).orElse(null);

        if (existingRoom == null) {
            throw new IllegalArgumentException("Room not found");
        }

        existingRoom.setRoomNumber(updatedRoom.getRoomNumber());
        existingRoom.setMonthlyRent(updatedRoom.getMonthlyRent());
        existingRoom.setStatus(updatedRoom.getStatus());

        return roomRepository.save(existingRoom);
    }

    public void deleteRoom(Long id) {

        Room room = roomRepository.findById(id).orElse(null);

        if (room == null) {
            throw new IllegalArgumentException("Room not found");
        }

        if ("OCCUPIED".equalsIgnoreCase(room.getStatus())) {
            throw new IllegalArgumentException(
                    "Cannot delete an occupied room"
            );
        }

        roomRepository.delete(room);
    }
}