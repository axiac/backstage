/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useApi } from '@backstage/core-plugin-api';
import useAsync from 'react-use/esm/useAsync';
import { octopusDeployApiRef, OctopusProject } from '../api';

export function useProject(
  projectId: string,
  spaceId?: string,
): {
  project?: OctopusProject;
  loading: boolean;
  error?: Error;
} {
  const api = useApi(octopusDeployApiRef);

  const { value, loading, error } = useAsync(() => {
    return api.getProjectInfo({ projectId: projectId, spaceId: spaceId });
  }, [api, projectId, spaceId]);

  return {
    project: value,
    loading,
    error,
  };
}
