import { state } from '../../index';
import { Vec2 } from '../math/vec2';

export class Camera {
  /**
   * @param center The center focus position of this camera in world coords.
   * @param scale Less than one means zoom in, greater than one means zoom out.
   * @param rotation Rotation in radians. Zero means no rotation.
   * @param zoomSpeed How fast to zoom the camera. Must be greater than 1.
   */
  constructor(
    public center = Vec2.zero(),
    public scale = 1,
    public rotation = 0,
    public zoomSpeed = 1.04
  ) {}

  public apply() {
    const context = state.draw.context;
    context.resetTransform();
    // Translate so that the center focus point is at the center of the canvas.
    const canvasCenter = state.draw.getCanvasCenter();
    context.translate(canvasCenter.x, canvasCenter.y);
    // Scale and rotate.
    context.scale(this.scale, this.scale);
    context.rotate(this.rotation);
    // First translate so that the center focus point is at the origin.
    context.translate(-this.center.x, -this.center.y);
  }

  /**
   * @param zoomIn Zoom in (true) or out (false)
   * @param deltaTime Elapsed time in seconds.
   */
  public zoom(zoomIn: boolean) {
    this.scale *= this.zoomSpeed ** (zoomIn ? 1 : -1);
  }
}
