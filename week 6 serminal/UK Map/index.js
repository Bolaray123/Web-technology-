document.addEventListener('DOMContentLoaded', () => {
    const paths = document.querySelectorAll('#uk-map path');
    const tooltip = document.getElementById('tooltip');

    paths.forEach(path => {
        path.addEventListener('mouseover', (event) => {
            const regionName = event.target.id.charAt(0).toUpperCase() + event.target.id.slice(1);
            tooltip.textContent = regionName;
            tooltip.style.display = 'block';
        });

        path.addEventListener('mousemove', (event) => {
            tooltip.style.left = event.pageX + 10 + 'px';
            tooltip.style.top = event.pageY + 10 + 'px';
        });

        path.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });
    });
});
