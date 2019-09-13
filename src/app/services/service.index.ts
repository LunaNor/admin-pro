/* Exportamos los servicios  */
/* Esto es para findes de manteción, si cambio de lugar algun servicio, solo cambio la ruta aquí,
y no en todos los componentes que donde se haya importado el servicio en especifico */
export { LoginGuardGuard } from './guards/login-guard.guard';
export { AdminGuard } from './guards/admin.guard';


export { MedicoService } from './medico/medico.service';
export { HospitalService } from './hospital/hospital.service';
export { SubirArchivoService } from './subir-archivo/subir-archivo.service';
export { UsuarioService } from './usuario/usuario.service';
export { SettingsService } from './settings/settings.service';
export { SharedService } from './shared/shared.service';
export { SidebarService } from './shared/sidebar.service';
