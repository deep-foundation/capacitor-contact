import { UsePermissionsStatusResult, usePermissionsStatus } from "../hooks/use-permissions-status.js";
import {PermissionStatus} from './../../permissionStatus.js'

export type WithPermissionStatusOptions = 
  {
    renderIfLoading: () => JSX.Element;
    renderIfGranted: () => JSX.Element;
    renderIfDenied: () => JSX.Element;
    renderIfPrompt: () => JSX.Element;
    renderIfPromptWithRationale: () => JSX.Element;
  }
 | {
  render: (PermissionStatus: UsePermissionsStatusResult) => JSX.Element;
}

export function WithPermissionsStatus(options: WithPermissionStatusOptions) {
  const permissionStatus = usePermissionsStatus();

  if('render' in options) {
    return options.render(permissionStatus);
  } else {
    if(permissionStatus.isLoading) {
      return options.renderIfLoading()
    } else if(permissionStatus.permissionStatus === 'granted') {
      return options.renderIfGranted()
    } else if(permissionStatus.permissionStatus === 'denied') {
      return options.renderIfDenied()
    } else if(permissionStatus.permissionStatus === 'prompt') {
      return options.renderIfPrompt()
    } else if(permissionStatus.permissionStatus === 'prompt-with-rationale') {
      return options.renderIfPromptWithRationale()
    } else {
      throw new Error(`Unexpected permission status: ${permissionStatus.permissionStatus}`)
    }
  }
}