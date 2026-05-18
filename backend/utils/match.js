function normalize(skill) {
  return skill.trim().toLowerCase();
}

function matchCandidates(candidates, job) {
  const requiredSkills = (job.requiredSkills || []).map(normalize);

  if (requiredSkills.length === 0) {
    return [];
  }

  return candidates.map(c => {
    const candidateSkills = (c.skills || []).map(normalize);

    const matched = candidateSkills.filter(skill =>
      requiredSkills.includes(skill)
    );

    const skillScore =
      matched.length / requiredSkills.length;

    // optional: experience boost
    const experienceScore =
      (job.minExperience ? Math.min(c.experience / job.minExperience, 1) : 1);

    const finalScore =
      (skillScore * 0.7) + (experienceScore * 0.3);

    return {
      ...c._doc,
      matchScore: Number(finalScore.toFixed(2))
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = { matchCandidates };