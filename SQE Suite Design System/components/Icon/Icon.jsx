/**
 * Icon — FontAwesome Pro 5 wrapper
 * Horizon Design System
 *
 * Usage:
 *   <Icon name="home" />
 *   <Icon name="user" variant="regular" />
 *   <Icon name="github" variant="brands" />
 *   <Icon name="spinner" spin />
 *   <Icon name="home" size="2x" color="var(--hz-horizon-primary)" />
 */

function Icon({
  name,
  variant = 'solid',
  size,
  fw = false,
  spin = false,
  pulse = false,
  color,
  className = '',
  style: styleProp = {},
  'aria-label': ariaLabel,
}) {
  const variantMap = {
    solid:   'fas',
    regular: 'far',
    light:   'fal',
    brands:  'fab',
    duotone: 'fad',
  };

  const cls = [
    variantMap[variant] ?? 'fas',
    'fa-' + name,
    size   && 'fa-' + size,
    fw     && 'fa-fw',
    spin   && 'fa-spin',
    pulse  && 'fa-pulse',
    className,
  ].filter(Boolean).join(' ');

  return React.createElement('i', {
    className: cls,
    style: color ? { color, ...styleProp } : styleProp,
    'aria-hidden': ariaLabel ? undefined : 'true',
    'aria-label':  ariaLabel,
    role:          ariaLabel ? 'img' : undefined,
  });
}

export { Icon };
