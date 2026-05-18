function matchCandidates(candidates, job) {
  return candidates.map(c => {
    const matched = c.skills.filter(s => job.requiredSkills.includes(s));
    const score = matched.length / job.requiredSkills.length;

    return {
      ...c._doc,
      matchScore: score
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = { matchCandidates };