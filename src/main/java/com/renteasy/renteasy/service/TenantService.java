package com.renteasy.renteasy.service;

import com.renteasy.renteasy.models.Room;
import com.renteasy.renteasy.models.Tenant;
import com.renteasy.renteasy.repository.RoomRepository;
import com.renteasy.renteasy.repository.TenantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TenantService {

    private final TenantRepository tenantRepository;
    private final RoomRepository roomRepository;

    public TenantService(TenantRepository tenantRepository,
                         RoomRepository roomRepository) {
        this.tenantRepository = tenantRepository;
        this.roomRepository = roomRepository;
    }

    public Tenant addTenant(Tenant tenant) {

        Room room = roomRepository.findById(tenant.getRoomId()).orElse(null);

        if (room == null) {
            throw new IllegalArgumentException("Room not found");
        }

        if ("OCCUPIED".equalsIgnoreCase(room.getStatus())) {
            throw new IllegalArgumentException("Room is already occupied");
        }

        room.setStatus("OCCUPIED");
        roomRepository.save(room);

        tenant.setActive(true);

        return tenantRepository.save(tenant);
    }

    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    public Tenant getTenantById(Long id) {
        return tenantRepository.findById(id).orElse(null);
    }

    public String vacateTenant(Long id) {

        Tenant tenant = tenantRepository.findById(id).orElse(null);

        if (tenant == null) {
            throw new IllegalArgumentException("Tenant not found");
        }

        if (!tenant.isActive()) {
            throw new IllegalArgumentException("Tenant is already inactive");
        }

        Room room = roomRepository.findById(tenant.getRoomId()).orElse(null);

        if (room != null) {
            room.setStatus("AVAILABLE");
            roomRepository.save(room);
        }

        tenant.setActive(false);
        tenantRepository.save(tenant);

        return "Tenant vacated and room is now available";
    }
}