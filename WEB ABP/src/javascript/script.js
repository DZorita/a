document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    initAccordion();
    initMembershipCards();
    handleMobileMenu();
    initSmoothScroll();
    initCookieMessage();

    function initAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        if (!accordionItems.length) return;

        accordionItems.forEach(function(item) {
            const header = item.querySelector('.accordion-header');
            if (!header) return;

            header.addEventListener('click', function() {
                accordionItems.forEach(function(otherItem) {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        });
    }

    function initMembershipCards() {
        const membershipCards = document.querySelectorAll('.membership-card');
        if (!membershipCards.length) return;

        membershipCards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            });
        });
    }

function initCookieMessage() {
        if (localStorage.getItem('cookiesAccepted') === 'true') return;

        setTimeout(function() {
            const cookieMessage = document.createElement('div');
            cookieMessage.className = 'cookie-message';
            cookieMessage.innerHTML = `
                <div class="cookie-content">
                    <p>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. <a href="#">Política de Cookies</a></p>
                    <button class="accept-cookies">Aceptar</button>
                </div>
            `;
            document.body.appendChild(cookieMessage);

            const acceptButton = document.querySelector('.accept-cookies');
            if (acceptButton) {
                acceptButton.addEventListener('click', function() {
                    cookieMessage.style.display = 'none';
                    localStorage.setItem('cookiesAccepted', 'true');
                });
            }
        }, 2000);
    }
});




// APIII
document.addEventListener("DOMContentLoaded", () => {
  const diasSemana = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];

  fetch("http://localhost:8082/api/horarios")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener los horarios.");
      }
      return response.json();
    })
    .then(horarios => {
      // Obtener franjas únicas
      const horasUnicas = [...new Set(horarios.map(h => `${h.horaApertura} - ${h.horaCierre}`))].sort();

      const tabla = document.createElement("table");
      tabla.classList.add("tabla-horario");

      // Crear encabezado
      const thead = document.createElement("thead");
      const filaEncabezado = document.createElement("tr");
      filaEncabezado.innerHTML = `<th>Hora</th>` + diasSemana.map(d => `<th>${d}</th>`).join('');
      thead.appendChild(filaEncabezado);
      tabla.appendChild(thead);

      // Crear cuerpo
      const tbody = document.createElement("tbody");

      horasUnicas.forEach(hora => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${hora}</td>`;

        diasSemana.forEach(dia => {
          const celda = document.createElement("td");
          const clase = horarios.find(h =>
            `${h.horaApertura} - ${h.horaCierre}` === hora && h.diaSemana === dia
          );

          if (clase && clase.claseGuiada) {
            const nombreClase = clase.claseGuiada.nombre;
            const monitor = clase.claseGuiada.monitor;
            const monitorNombre = monitor ? `${monitor.nombre} ${monitor.apellido1}` : "Sin asignar";

            celda.innerHTML = `
              <div class="clase">
                <strong>${nombreClase}</strong><br>
                <small>con ${monitorNombre}</small>
              </div>
            `;
          }

          fila.appendChild(celda);
        });

        tbody.appendChild(fila);
      });

      tabla.appendChild(tbody);
      document.getElementById("tabla-horario-container").appendChild(tabla);
    })
    .catch(error => {
      console.error("Error al cargar la tabla:", error);
      document.getElementById("tabla-horario-container").textContent = "No se pudo cargar el horario.";
    });
});




window.onscroll = function() {
    var navbar = document.querySelector('.nav-bar');
    if (window.scrollY > 50) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
}
